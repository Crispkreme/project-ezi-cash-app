const Cancelled = () => {
    const route = useRoute();
    const { data } = route.params;
  
    return (
      <View>
        <Text>Payment Cancelled</Text>
        <Text>Data: {JSON.stringify(data, null, 2)}</Text>
      </View>
    );
  };
  
  export default Cancelled;
  