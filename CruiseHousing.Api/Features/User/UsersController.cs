using CruiseHousing.Api.Features.User.DTOs;
using CruiseHousing.Api.Messages;
using CruiseHousing.Api.Security;
using CruiseHousing.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CruiseHousing.Api.Features.User
{
    /// <summary>
    /// ユーザー管理API
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        /// <summary>
        /// Gets the user service instance used for managing user-related operations.
        /// </summary>
        private readonly UserService _userService;

        /// <summary>
        /// Gets the user search service used for querying user data.
        /// </summary>
        /// <remarks>This field is initialized during the construction of the containing class and is used
        /// to perform user-related search operations.</remarks>
        private readonly UserSearchService _userSearchService;

        /// <summary>
        /// JobService
        /// </summary>
        private readonly UserImportService _userImportService;

        /// <summary>
        /// UserExportService
        /// </summary>
        private readonly UserExportService _userExportService;

        /// <summary>
        /// コンストラクタ
        /// </summary>
        public UsersController(
            UserService userService,
            UserSearchService userSearchService,
            UserImportService userImportService,
            UserExportService userExportService)
        {
            _userService = userService;
            _userSearchService = userSearchService;
            _userImportService = userImportService;
            _userExportService = userExportService;
        }

        /// <summary>
        /// ユーザー一覧取得
        /// </summary>
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _userService.GetAllAsync();
            return Ok(result);
        }

        /// <summary>
        /// IDでユーザー取得
        /// </summary>
        [AdminOnly]
        [HttpGet("{id:long}")]
        public async Task<IActionResult> GetById(long id)
        {
            var result = await _userService.GetByIdAsync(id);

            return Ok(result);
        }

        /// <summary>
        /// ユーザー新規登録
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUserDto dto)
        {
            if (dto == null)
            {
                return BadRequest(new { message = ErrorMessages.RequestDataInvalid });
            }

            var result = await _userService.CreateAsync(dto);

            return CreatedAtAction(
                nameof(GetById),
                new { id = result.UserId },
                result
            );
        }

        /// <summary>
        /// ユーザー更新
        /// </summary>
        [HttpPut("{id:long}")]
        public async Task<IActionResult> Update(long id, [FromBody] UpdateUserDto dto)
        {
            if (dto == null)
            {
                return BadRequest(new { message = ErrorMessages.RequestDataInvalid });
            }

            var result = await _userService.UpdateAsync(id, dto);

            return Ok(result);
        }

        /// <summary>
        /// ユーザー物理削除
        /// </summary>
        [HttpDelete("{id:long}")]
        public async Task<IActionResult> Delete(long id)
        {
            var deleted = await _userService.DeleteAsync(id);

            return NoContent();
        }

        /// <summary>
        /// ユーザー論理削除
        /// </summary>
        [HttpPatch("{id:long}/soft-delete")]
        public async Task<IActionResult> SoftDelete(
            long id,
            [FromQuery] string? updUserId,
            [FromQuery] string? updUser)
        {
            var deleted = await _userService.SoftDeleteAsync(id, updUserId, updUser);

            if (!deleted)
            {
                return NotFound(new { message = "対象ユーザーが存在しません。" });
            }

            return Ok(new { message = "論理削除しました。" });
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("search")]
        public async Task<IActionResult> Search([FromBody] UserSearchRequest request)
        {
            var result = await _userSearchService.SearchAsync(request);
            return Ok(result);
        }

        /// <summary>
        /// ユーザーCSVをアップロードしてインポートする
        /// </summary>
        [HttpPost("import-csv")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> ImportCsv([FromForm] ImportUsersCsvRequest request)
        {
            var result = await _userImportService.ImportCsvAsync(request.File);
            return Ok(result);
        }

        /// <summary>
        /// ユーザー一覧をCSVでエクスポートする
        /// </summary>
        [HttpGet("export-csv")]
        public async Task<IActionResult> ExportCsv([FromQuery] ExportUsersCsvRequestDto request)
        {
            var result = await _userExportService.ExportCsvAsync(request);

            return File(
                result.FileBytes,
                "text/csv; charset=utf-8",
                result.FileName);
        }
    }
}