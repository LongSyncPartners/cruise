import { useEffect, useState } from "react";
import { getDashboardSummary } from "./dashboardService";

export function useDashboard() {
    const [summary, setSummary] = useState({
        customerCount: 0,
        forecastToday: 0,
        deliveryCount: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const data = await getDashboardSummary();
                setSummary(data);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    return {
        summary,
        loading,
    };
}
