import React from 'react';
import { frontendRoutes } from './utils/constants';
import Campaigns from './views/Campaigns/Campaigns';
import CreateCampaign from './views/Campaigns/CreateCampaign';
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const EditCampaign = React.lazy(() => import('./views/Campaigns/EditCampaign'));
const Ads = React.lazy(() => import('./views/Ads/Ads'));
const CreateAd = React.lazy(() => import('./views/Ads/CreateAd'));
const EditAd = React.lazy(() => import('./views/Ads/EditAd'));



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: frontendRoutes.home.path, exact: true, name: frontendRoutes.home.name },
  { path: frontendRoutes.dashboard.path, exact: true, name: frontendRoutes.dashboard.name , component: Dashboard },
  // { path: '/users', exact: true,  name: 'Users', component: Users },
  // { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: frontendRoutes.campaigns.path, exact: true, name: frontendRoutes.campaigns.name, component: Campaigns },
  { path: frontendRoutes.createCampaigns.path, exact: true, name: frontendRoutes.createCampaigns.name, component: CreateCampaign },
  { path: frontendRoutes.editCampaigns.path, exact: true, name: frontendRoutes.editCampaigns.name, component: EditCampaign },
  { path: frontendRoutes.ads.path, exact: true, name: frontendRoutes.ads.name, component: Ads },
  { path: frontendRoutes.createAds.path, exact: true, name: frontendRoutes.createAds.name, component: CreateAd },
  { path: frontendRoutes.editAds.path, exact: true, name: frontendRoutes.editAds.name, component: EditAd },

];

export default routes;
