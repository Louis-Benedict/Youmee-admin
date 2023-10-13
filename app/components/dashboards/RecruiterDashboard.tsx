'use client'
import {
    Avatar,
    Box,
    Button,
    Card,
    Flex,
    Grid,
    Heading,
    Section,
    Text,
} from '@radix-ui/themes'
import { FC } from 'react'
import DashboardHeader from '../ui/admin/DashboardHeader'
import {
    PieChart,
    Pie,
    Sector,
    Cell,
    ResponsiveContainer,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Area,
    Tooltip,
} from 'recharts'

interface RecruiterDashboardProps {}

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
]

const data2 = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const RecruiterDashboard: FC<RecruiterDashboardProps> = ({}) => {
    return (
        <>
            <DashboardHeader title="Dashboard" actions={[]} />
            <Section>
                <Card>
                    <Flex direction="row">
                        <Flex justify="between">
                            <Box>
                                <Heading size="4" color="gray">
                                    Sales net
                                </Heading>
                                <Heading size="6">12.005THB</Heading>
                                <Heading size="4" color="green">
                                    2.57%
                                </Heading>
                            </Box>
                        </Flex>
                        <PieChart width={200} height={200}>
                            <Pie
                                data={data}
                                cx={100}
                                cy={95}
                                innerRadius={40}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={0}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </Flex>
                </Card>
                <Flex>
                    <Card>
                        <Flex direction="column">
                            <Flex justify="between">
                                <Box>
                                    <Heading size="4" color="gray">
                                        Sales net
                                    </Heading>
                                    <Heading size="6">12.005THB</Heading>
                                    <Heading size="4" color="green">
                                        2.57%
                                    </Heading>
                                </Box>
                            </Flex>

                            <AreaChart width={500} height={400} data={data2}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="uv"
                                    fill="#8884d8"
                                />
                            </AreaChart>
                        </Flex>
                    </Card>
                    <Card>
                        <Flex direction="row">
                            <Flex justify="between">
                                <Box>
                                    <Heading size="4" color="gray">
                                        Revenue per creator
                                    </Heading>
                                    <Heading size="6">12.005THB</Heading>
                                    <Heading size="5" color="green">
                                        2.57%
                                    </Heading>
                                </Box>
                            </Flex>
                            <PieChart width={200} height={200}>
                                <Pie
                                    data={data}
                                    cx={100}
                                    cy={95}
                                    innerRadius={70}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={0}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </Flex>
                        <Flex direction="column" gap="1">
                            <Box>
                                <Card>
                                    <Flex gap="3" align="center">
                                        <Heading>1.</Heading>
                                        <Avatar
                                            size="3"
                                            src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                                            radius="full"
                                            fallback="T"
                                        />
                                        <Box>
                                            <Text
                                                as="div"
                                                size="2"
                                                weight="bold"
                                            >
                                                Teodros Girmay
                                            </Text>
                                            <Text
                                                as="div"
                                                size="2"
                                                color="gray"
                                            >
                                                Engineering
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Card>
                            </Box>
                            <Box>
                                <Card>
                                    <Flex gap="3" align="center">
                                        <Heading>2.</Heading>
                                        <Avatar
                                            size="3"
                                            src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                                            radius="full"
                                            fallback="T"
                                        />
                                        <Box>
                                            <Text
                                                as="div"
                                                size="2"
                                                weight="bold"
                                            >
                                                Teodros Girmay
                                            </Text>
                                            <Text
                                                as="div"
                                                size="2"
                                                color="gray"
                                            >
                                                Engineering
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Card>
                            </Box>
                            <Box>
                                <Card>
                                    <Flex gap="3" align="center">
                                        <Heading color="gray">3.</Heading>
                                        <Avatar
                                            size="3"
                                            src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                                            radius="full"
                                            fallback="T"
                                        />
                                        <Box>
                                            <Text
                                                as="div"
                                                size="2"
                                                weight="bold"
                                            >
                                                Teodros Girmay
                                            </Text>
                                            <Text
                                                as="div"
                                                size="2"
                                                color="gray"
                                            >
                                                Engineering
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Card>
                            </Box>
                        </Flex>
                    </Card>
                </Flex>
            </Section>
        </>
    )
}

export default RecruiterDashboard
