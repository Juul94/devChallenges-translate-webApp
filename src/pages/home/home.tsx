import { ReactElement } from 'react';
import Layout from '@layouts/layout';
import { Box } from '@mui/material';

const Home = () => {
    return <Box>Content here</Box>;
};

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Home;
