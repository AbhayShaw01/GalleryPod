import React from 'react';
import { Alert } from '@/components/bootsrap';

const Page = () => {
    return (
        <Alert>
          This is a sample project to load images to Demonstrate various features of NextJs listed below:
          <ul>
            <li>Static and Dynamic Server-Side Rendering</li>
            <li>Incremental Static Regenration</li>
            <li>Client Side Rendering</li>
            <li>Router handlers (API end-points)</li>
            <li>Meta data API</li>
          </ul>
        </Alert>
    );
};

export default Page;