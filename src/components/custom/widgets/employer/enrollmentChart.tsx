"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
const chartData = [
  { enrollment: "easyEnroll", employees: 210, fill: "var(--color-easyEnroll)" },
  { enrollment: "selfEnroll", employees: 75, fill: "var(--color-selfEnroll)" },
  { enrollment: "optOut", employees: 28, fill: "var(--color-optOut)" },
]

const chartConfig = {

  easyEnroll: {
    label: "Easy Enroll",
    color: "hsl(var(--chart-1))",
  },
  selfEnroll: {
    label: "Self Enroll",
    color: "hsl(var(--chart-2))",
  },
  optOut: {
    label: "Opted Out",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function EnrollmentChart() {
  const totalEmployees = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.employees, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center justify-between flex-row pb-0">
        <CardTitle>Employee Enrollment</CardTitle>
        <Button variant="link" size="link">
          Download Report
        </Button>
      </CardHeader>
      <CardContent className="flex flex-row items-center justify-between pb-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-square h-[15.625rem]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="employees"
              nameKey="enrollment"
              innerRadius={70}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalEmployees.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Employees
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="w-full space-y-2 text-sm text-muted-foreground">
          {Object.keys(chartConfig).map((key) => (
            <div key={key} className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center justify-between">
                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: chartConfig[key as keyof typeof chartConfig].color }}></div>
                    <div>{chartConfig[key as keyof typeof chartConfig].label}</div>
                </div>
                <span className="font-bold">{chartData.find(item => item.enrollment === key)?.employees.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
