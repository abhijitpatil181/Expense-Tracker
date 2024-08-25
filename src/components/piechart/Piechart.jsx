import React from "react";
import { PieChart, ResponsiveContainer, Pie, Cell, Legend } from "recharts";
import styles from "./Piechart.module.css";
import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";

const data = [
  {
    id: "123",
    category: "Food",
    title: "Samosa",
    date: "March 20, 2024",
    price: 150,
  },
  {
    id: "839",
    category: "Entertainment",
    title: "Movie",
    date: "March 21, 2024",
    price: 300,
  },
  {
    id: "389",
    category: "Travel",
    title: "Auto",
    date: "March 22, 2024",
    price: 50,
  },
];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const COLORS = ["#FF9304", "#A000FF", "#FDE006"];

const Piechart = () => {
  const { combinedExpenseData } = useContext(TransactionContext);
  return (
    <div className={styles.pieChartContainer}>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={combinedExpenseData}
            dataKey="price"
            nameKey="category"
            outerRadius={100}
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="none"
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Piechart;
