export const getServerSideProps = async () => {
    console.log(process.env["X-CMC_PRO_API_KEY"]);

    const res = await fetch('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&sort=market_cap&cryptocurrency_type=all&tag=all&limit=10', {
        method: 'GET',
        headers: {
            'X-CMC_PRO_API_KEY': process.env["X-CMC_PRO_API_KEY"]|| "",
        },

      
        });
        console.log(await res.json());
    return {
      props:{}, 
    
    }
  };