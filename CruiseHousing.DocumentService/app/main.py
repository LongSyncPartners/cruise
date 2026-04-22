from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML

app = FastAPI()

BASE_DIR = Path(__file__).resolve().parent
TEMPLATE_DIR = BASE_DIR / "templates"
OUTPUT_DIR = BASE_DIR / "output"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

env = Environment(loader=FileSystemLoader(str(TEMPLATE_DIR)))

class PdfItem(BaseModel):
    name: str
    amount: str

class GeneratePdfRequest(BaseModel):
    jobId: str
    title: str
    items: list[PdfItem]

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/internal/pdf/generate")
def generate_pdf(req: GeneratePdfRequest):
    template = env.get_template("report.html")

    html_string = template.render(
        title=req.title,
        items=[item.model_dump() for item in req.items]
    )

    output_file = OUTPUT_DIR / f"{req.jobId}.pdf"
    HTML(string=html_string, base_url=str(BASE_DIR)).write_pdf(str(output_file))

    return {
        "status": "ok",
        "jobId": req.jobId,
        "fileName": output_file.name
    }

@app.get("/internal/files/{file_name}")
def get_file(file_name: str):
    file_path = OUTPUT_DIR / file_name
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(
        path=file_path,
        media_type="application/pdf",
        filename=file_name
    )