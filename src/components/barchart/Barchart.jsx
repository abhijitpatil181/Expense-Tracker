import { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TransactionContext } from "../../context/TransactionContext";

const Barchart = () => {
  const { combinedExpenseData } = useContext(TransactionContext);
  console.log("combined Expense Data", combinedExpenseData);

  return (
    <>
      {combinedExpenseData && (
        <ResponsiveContainer
          width="100%"
          height="95%"
          style={{
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 4px 4px 0px #00000040",
            borderRadius: "15px",
          }}
        >
          <BarChart
            width={500}
            height={300}
            data={combinedExpenseData}
            margin={{
              top: 5,
              right: 30,
              left: 40,
              bottom: 5,
            }}
            layout="vertical"
          >
            <XAxis hide axisLine={false} type="number" />
            <YAxis
              yAxisId={0}
              dataKey="category"
              type="category"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip />

            <Bar dataKey="price" stackId="a" fill="#8884d8" barSize={25} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default Barchart;
