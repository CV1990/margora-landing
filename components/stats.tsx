const stats = [
  {
    value: "20",
    unit: "días",
    label: "ahorrados en promedio por proyecto",
    company: "TECHSTART",
  },
  {
    value: "98",
    unit: "%",
    label: "más rápido el time to market",
    company: "FINTECH MX",
  },
  {
    value: "300",
    unit: "%",
    label: "incremento en conversiones",
    company: "RETAIL CO",
  },
  {
    value: "6",
    unit: "x",
    label: "más rápido para construir y desplegar",
    company: "INNOVALAB",
  },
]

export function Stats() {
  return (
    <section className="py-20 bg-card border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-background rounded-2xl shadow-lg shadow-primary/5 border border-border/30 hover:shadow-xl hover:shadow-primary/10 transition-shadow"
            >
              <p className="text-4xl sm:text-5xl font-bold mb-3">
                <span className="text-primary">{stat.value}</span>
                <span className="text-muted-foreground text-2xl ml-1">{stat.unit}</span>
              </p>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{stat.label}</p>
              <p className="text-xs font-semibold tracking-wider text-primary/60 uppercase">
                {stat.company}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
