from urllib.request import Request

import sqltap

async def sql_tap(request: Request, call_next):
    # Start the profiler
    profiler = sqltap.start()
    # Call the next middleware
    response = await call_next(request)
    # Collect the statistics
    statistics = profiler.collect()
    # Generate a report
    sqltap.report(statistics, "report.txt", report_format="text")
    return response