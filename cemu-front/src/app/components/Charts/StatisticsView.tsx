'use client';

import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Bar,
} from 'recharts';
import type { RequestResponseDTO } from '../../models/request.model';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#F1948A'];

interface StatisticsViewProps {
    requests: RequestResponseDTO[];
    internships: any[];
}

export default function StatisticsView({ requests, internships }: StatisticsViewProps) {
    const requestsByDegree = requests.reduce((acc: Record<string, number>, req) => {
        const degreeName = req.internship_id?.degree?.name || 'Sin grado';
        acc[degreeName] = (acc[degreeName] || 0) + 1;
        return acc;
    }, {});

    const requestsByDegreeData = Object.entries(requestsByDegree).map(([name, value]) => ({
        name,
        value,
    }));

    const requestsByStatus = requests.reduce(
        (acc: { true: number; false: number }, req) => {
            acc[req.status ? 'true' : 'false']++;
            return acc;
        },
        { true: 0, false: 0 }
    );

    const requestsByStatusData = [
        { name: 'Revisados', value: requestsByStatus.true },
        { name: 'Sin Revisar', value: requestsByStatus.false },
    ];

    const requestsByCompany = requests.reduce((acc: Record<string, number>, req) => {
        const companyName = req.internship_id?.company?.name || 'Sin empresa';
        acc[companyName] = (acc[companyName] || 0) + 1;
        return acc;
    }, {});

    const requestsByCompanyData = Object.entries(requestsByCompany).map(([name, value]) => ({
        name,
        value,
    }));

    // Tooltip personalizado
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <Paper sx={{ p: 1 }}>
                    <Typography variant="body2">{`${payload[0].payload.name}: ${payload[0].value}`}</Typography>
                </Paper>
            );
        }
        return null;
    };

    return (
        <Grid container spacing={3}>
            {/* Solicitudes por Grado */}
            <Grid item xs={12} md={12}>
                <Paper sx={{ width: 500, height: 350, p: 2 }}>
                    <Typography variant="h6" mb={2}>
                        Solicitudes por Grado
                    </Typography>
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={requestsByDegreeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="value">
                                {requestsByDegreeData.map((_, i) => (
                                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>
            </Grid>

            {/* Solicitudes por Estado */}
            <Grid item xs={12} md={6}>
                <Paper sx={{ width: 400, height: 350, p: 2 }}>
                    <Typography variant="h6" mb={2}>
                        Solicitudes por Estado
                    </Typography>
                    <ResponsiveContainer width="100%" height="85%">
                        <PieChart>
                            <Pie
                                data={requestsByStatusData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {requestsByStatusData.map((_, i) => (
                                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Paper>
            </Grid>

            {/* Prácticas por Empresa */}
            <Grid item xs={12} md={12}>
                <Paper sx={{ width: 500, height: 350, p: 2 }}>
                    <Typography variant="h6" mb={2}>
                        Prácticas por Empresa
                    </Typography>
                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={requestsByCompanyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="value">
                                {requestsByCompanyData.map((_, i) => (
                                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>
            </Grid>
        </Grid>
    );
}
