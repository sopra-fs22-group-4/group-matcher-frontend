import { ScriptableContext } from 'chart.js'
import { Chart } from 'primereact/chart'
import React from 'react'

const gradientBorder = (context: ScriptableContext<any>) => {
  if (context?.chart?.chartArea) {
    const gradient = context.chart.ctx.createLinearGradient(0, context.chart.chartArea.bottom, 0, context.chart.chartArea.top)
    gradient.addColorStop(0, '#344FDB')
    gradient.addColorStop(0.6, '#CF6BFF')
    gradient.addColorStop(1, '#CF6BFF')
    return gradient
  }
}

export function DailySubmissionsChart({ submissions }: { submissions: Record<string, number> }) {
  const tickStyle = { color: '#999999', font: { family: '"DM Sans", sans-serif', size: 10 } }
  const dataset = { data: Object.values(submissions), borderColor: gradientBorder, pointRadius: 0, fill: 'start',
    backgroundColor: 'rgba(177,255,140,0.1)', tension: .2 }
  const xAxis = { ticks: tickStyle, grid: { display: false } }
  const yAxis = { min: 0, max: 50, ticks: tickStyle, grid: { color: '#ebedef', borderDash: [8,4] } }
  const options = { aspectRatio: 1, scales: { x: xAxis, y: yAxis }, plugins: { legend: { display: false } } }
  return <Chart type='line' data={{ labels: Object.keys(submissions), datasets: [dataset] }} options={options} />
}

export function AnswersBarChart({ question }: { question: QuestionProps }) {
  const labels = question.answers.map(answer => answer.content)
  const dataset = { data: question.answers.map(answer => answer.selectedCount), backgroundColor: '#5048E5' }
  const options = { scales: { y: { display: false, suggestedMax: 7 }, x: { grid: { display: false, drawBorder: false } } },
    plugins: { legend: { display: false } } }
  return <Chart type='bar' data={{ labels, datasets: [dataset] }} options={options} />
}