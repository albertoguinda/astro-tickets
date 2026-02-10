import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
// Tree-shaken lucide-react imports - reduce de 80 KB a 4 KB
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import Users from 'lucide-react/dist/esm/icons/users';
import DollarSign from 'lucide-react/dist/esm/icons/dollar-sign';
import CreditCard from 'lucide-react/dist/esm/icons/credit-card';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Data
const salesData = [
  { name: 'Ene', total: 1500 },
  { name: 'Feb', total: 2300 },
  { name: 'Mar', total: 3200 },
  { name: 'Abr', total: 2800 },
  { name: 'May', total: 4500 },
  { name: 'Jun', total: 5100 },
  { name: 'Jul', total: 4800 },
  { name: 'Ago', total: 5600 },
  { name: 'Sep', total: 6200 },
  { name: 'Oct', total: 7500 },
  { name: 'Nov', total: 8100 },
  { name: 'Dic', total: 9200 },
];

const categoryData = [
  { name: 'Conciertos', value: 45, color: '#6366f1' }, // Primary
  { name: 'Teatro', value: 25, color: '#8b5cf6' },    // Secondary
  { name: 'Deportes', value: 20, color: '#22d3ee' },   // Accent
  { name: 'Otros', value: 10, color: '#94a3b8' },     // Neutral
];

const trafficData = [
  { time: '00:00', users: 120 },
  { time: '04:00', users: 80 },
  { time: '08:00', users: 450 },
  { time: '12:00', users: 1200 },
  { time: '16:00', users: 980 },
  { time: '20:00', users: 1500 },
  { time: '23:59', users: 600 },
];

// Components
const Card = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={cn("rounded-xl border border-base-300 bg-base-100 text-base-content shadow-sm", className)}>
    {children}
  </div>
);

const CardHeader = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)}>
    {children}
  </div>
);

const CardTitle = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <h3 className={cn("font-semibold leading-none tracking-tight", className)}>
    {children}
  </h3>
);

const CardContent = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={cn("p-6 pt-0", className)}>
    {children}
  </div>
);

export default function DashboardCharts() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-base-content" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.231,89€</div>
            <p className="text-xs text-base-content font-medium">+20.1% respecto al mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suscripciones</CardTitle>
            <Users className="h-4 w-4 text-base-content" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-base-content font-medium">+180.1% respecto al mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas</CardTitle>
            <CreditCard className="h-4 w-4 text-base-content" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-base-content font-medium">+19% respecto al mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activos Ahora</CardTitle>
            <TrendingUp className="h-4 w-4 text-base-content" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-base-content font-medium">+201 desde la última hora</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Row */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">

        {/* Bar Chart - Revenue */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-4 overflow-hidden">
          <CardHeader>
            <CardTitle>Resumen de ingresos</CardTitle>
            <p className="text-sm text-base-content font-medium">Ingresos mensuales durante 2026.</p>
          </CardHeader>
          <CardContent className="pl-2 pr-4">
            <div className="h-[300px] w-full overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `${value}€`} 
                  />
                  <Tooltip 
                    cursor={{fill: 'var(--color-base-200)', opacity: 0.5}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar 
                    dataKey="total" 
                    fill="currentColor" 
                    className="fill-primary" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Pie Chart */}
        <Card className="col-span-1 md:col-span-1 lg:col-span-3 overflow-hidden">
            <CardHeader>
                <CardTitle>Distribución por categoría</CardTitle>
                <p className="text-sm text-base-content font-medium">Ventas por tipo de evento.</p>
            </CardHeader>
            <CardContent className="px-2">
                <div className="h-[300px] w-full flex items-center justify-center overflow-hidden">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-base-content font-medium mt-4 px-4">
                    {categoryData.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                            <span className="truncate">{item.name}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>

      {/* Traffic Area Chart */}
      <Card>
          <CardHeader>
            <CardTitle>Tráfico en Tiempo Real</CardTitle>
             <p className="text-sm text-base-content font-medium">Usuarios activos en el sitio durante el día.</p>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                  <Area type="monotone" dataKey="users" stroke="var(--color-secondary)" fillOpacity={1} fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
      </Card>
    </div>
  );
}