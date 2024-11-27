"use client"

import { useState, useMemo, useRef } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Download, FileDown } from 'lucide-react'
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

const currentYear = new Date().getFullYear()

const initialData = [
  { lowCodeCoverage: 70, openSourceCoverage: 50, cost: 100 },
  { lowCodeCoverage: 80, openSourceCoverage: 75, cost: 120 },
  { lowCodeCoverage: 90, openSourceCoverage: 100, cost: 150 },
  { lowCodeCoverage: 70, openSourceCoverage: 100, cost: 180 },
  { lowCodeCoverage: 0, openSourceCoverage: 90, cost: 200 },
  { lowCodeCoverage: 0, openSourceCoverage: 90, cost: 220 },
]

export function DynamicSolutionCoverageCostComparison() {
  const [startYear, setStartYear] = useState(currentYear)
  const [data, setData] = useState(initialData)
  const [title, setTitle] = useState("OPEX: Low Code vs Open Source")
  const [description, setDescription] = useState("Low code will never be perfect, and will eventually fail to work (6-year span)")
  const chartRef = useRef(null)
  const copyrightNotice = "© 2024 Niels Gregers Johansen. MIT Licensed."

  const handleInputChange = (index: number, field: string, value: string) => {
    const newData = [...data]
    newData[index] = { ...newData[index], [field]: Number(value) }
    setData(newData)
  }

  const calculatedData = useMemo(() => {
    return data.reduce((acc: { year: number; lowCodeCoverage: number; openSourceCoverage: number; cost: number; lowCodeCost: number; openSourceCost: number; accLowCodeCost: number; accOpenSourceCost: number; }[], curr, index) => {
      const year = startYear + index
      const lowCodeCost = curr.cost * ((100 - curr.lowCodeCoverage) / 100)
      const openSourceCost = curr.cost * ((100 - curr.openSourceCoverage) / 100)
      const prevAcc = index > 0 ? acc[index - 1] : { accLowCodeCost: 0, accOpenSourceCost: 0 }

      acc.push({
        year,
        ...curr,
        lowCodeCost,
        openSourceCost,
        accLowCodeCost: prevAcc.accLowCodeCost + lowCodeCost,
        accOpenSourceCost: prevAcc.accOpenSourceCost + openSourceCost,
      })

      return acc
    }, [])
  }, [data, startYear])

  const downloadAsImage = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current)
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.font = '16px Arial'
        ctx.fillStyle = 'black'
        ctx.fillText(title, 10, 20)
        ctx.font = '12px Arial'
        ctx.fillText(description, 10, 40)
        ctx.fillText(copyrightNotice, 10, canvas.height - 10)
      }
      const image = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = image
      link.download = "chart.png"
      link.click()
    }
  }

  const downloadAsPDF = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current)
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("landscape")
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
      pdf.addImage(imgData, "PNG", 0, 30, pdfWidth, pdfHeight)
      pdf.setFontSize(18)
      pdf.text(title, 10, 20)
      pdf.setFontSize(12)
      pdf.text(description, 10, 26)
      pdf.setFontSize(10)
      pdf.text(copyrightNotice, 10, pdf.internal.pageSize.getHeight() - 10)
      pdf.save("chart.pdf")
    }
  }

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-bold"
          />
        </CardTitle>
        <CardDescription>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="startYear">Start Year</Label>
          <Input
            id="startYear"
            type="number"
            value={startYear}
            onChange={(e) => setStartYear(Number(e.target.value))}
            className="w-full max-w-xs"
          />
        </div>
        <div className="h-[400px] mb-8" ref={chartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={calculatedData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" orientation="left" domain={[0, 100]} label={{ value: 'Solution Coverage (%)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Accumulated Cost', angle: 90, position: 'insideRight' }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="lowCodeCoverage" name="Low Code Coverage" stroke="blue" strokeDasharray="5 5" dot={{ fill: 'blue' }} />
              <Line yAxisId="left" type="monotone" dataKey="openSourceCoverage" name="Open Source Coverage" stroke="green" strokeDasharray="5 5" dot={{ fill: 'green' }} />
              <Line yAxisId="right" type="monotone" dataKey="accLowCodeCost" name="Low Code Cost" stroke="blue" strokeWidth={2} dot={{ fill: 'blue' }} />
              <Line yAxisId="right" type="monotone" dataKey="accOpenSourceCost" name="Open Source Cost" stroke="green" strokeWidth={2} dot={{ fill: 'green' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex space-x-4 mb-4">
          <Button onClick={downloadAsImage}>
            <Download className="mr-2 h-4 w-4" /> Download as Image
          </Button>
          <Button onClick={downloadAsPDF}>
            <FileDown className="mr-2 h-4 w-4" /> Download as PDF
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Year</TableHead>
              <TableHead>Low Code Coverage (%)</TableHead>
              <TableHead>Open Source Coverage (%)</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Low Code Cost</TableHead>
              <TableHead>Open Source Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {calculatedData.map((item, index) => (
              <TableRow key={item.year}>
                <TableCell>{item.year}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.lowCodeCoverage}
                    onChange={(e) => handleInputChange(index, 'lowCodeCoverage', e.target.value)}
                    className="w-full"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.openSourceCoverage}
                    onChange={(e) => handleInputChange(index, 'openSourceCoverage', e.target.value)}
                    className="w-full"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.cost}
                    onChange={(e) => handleInputChange(index, 'cost', e.target.value)}
                    className="w-full"
                  />
                </TableCell>
                <TableCell>{item.lowCodeCost.toFixed(2)}</TableCell>
                <TableCell>{item.openSourceCost.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}