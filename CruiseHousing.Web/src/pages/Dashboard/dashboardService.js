// API mockup for dashboard summary data    
export async function getDashboardSummary() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                customerCount: 120,
                forecastToday: 85,
                deliveryCount: 12,
            });
        }, 500);
    });
}
