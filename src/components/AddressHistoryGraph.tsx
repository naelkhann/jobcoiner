import * as React from "react";
import { Divider, Flex, Text } from "@chakra-ui/react";
import {
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import decorateTransactionsForRecharts, {
  TransactionsAsChartData,
} from "../util/decorateTransactions";

import { AddressData } from "../api/jobcoinApi";

interface AddressHistoryGraphProps {
  addressData?: AddressData;
  address?: string;
}

function AddressHistoryGraph(props: AddressHistoryGraphProps) {
  const [chartData, setChartData] = React.useState<TransactionsAsChartData[]>(
    []
  );

  React.useEffect(() => {
    if (props.addressData && props.address) {
      const data = decorateTransactionsForRecharts(
        props.addressData.transactions,
        props.address
      );
      setChartData(data);
    }
  }, [props.addressData, props.address]);

  return (
    <Flex flexDirection="column">
      <Text fontSize="xl">Transactions Over Time</Text>
      <Divider marginY={4} />
      <ResponsiveContainer width="100%" height={600}>
        <LineChart data={chartData}>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotoneX" dataKey="balance" />
        </LineChart>
      </ResponsiveContainer>
    </Flex>
  );
}

export default AddressHistoryGraph;
