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

export function GradientLineChart({ labels, data }: { labels: Array<string>, data: Array<number>}) {
  const tickStyle = { color: '#999999', font: { family: '"DM Sans", sans-serif', size: 10 } }
  const dataset = { data: data, borderColor: gradientBorder, pointRadius: 0, fill: 'start', backgroundColor: 'rgba(177,255,140,0.1)', tension: .2 }
  const xAxis = { ticks: tickStyle, grid: { display: false } }
  const yAxis = { min: 0, max: 50, ticks: tickStyle, grid: { color: '#ebedef', borderDash: [8,4] } }
  const options = { aspectRatio: 1, scales: { x: xAxis, y: yAxis  }, plugins: { legend: { display: false } } }
  return <Chart type='line' data={{ labels: labels, datasets: [dataset] }} options={options} />
}