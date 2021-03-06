import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Stripe from 'stripe';
import Card from '../components/Card';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SK as string, {
    apiVersion: '2020-08-27',
  });

  const response = await stripe.prices.list({
    expand: ['data.product'],
  });

  const prices = response.data.filter((price) => price.active);

  return {
    props: {
      prices,
    },
  };
};

type Props = {
  prices: Stripe.Price[];
};

const Home: NextPage<Props> = ({ prices }) => {
  return (
    <div>
      <Head>
        <title>Best plants available online</title>
        <meta
          name='description'
          content='E-commerce app created using Next.js.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='grid grid-cols-2 sm:grid-cols-3'>
        {prices.map((p) => (
          <Card key={p.id} price={p} />
        ))}
      </div>
    </div>
  );
};

export default Home;
