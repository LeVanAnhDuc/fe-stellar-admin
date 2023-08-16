import Home from '../pages/Home';
import HistoryTransaction from '../pages/HistoryTransaction';
import InfoGuest from '../pages/InfoGuest';
import ListRoom from '../pages/ListRoom';
import ServiceRestaurant from '../pages/ServiceRestaurant';
import Utilities from '../pages/Utilities';
import DetailInfo from '../pages/DetaiInfo/DetaiInfo';

import Error404 from '../pages/Error404';

import config from '../config';

const publishRoute = [
    { path: config.Routes.home, component: Home },
    { path: config.Routes.historyTransaction, component: HistoryTransaction },
    { path: config.Routes.infoGuest, component: InfoGuest },
    { path: config.Routes.detaiInfo, component: DetailInfo },
    { path: config.Routes.listRoom, component: ListRoom },
    { path: config.Routes.serviceRestaurant, component: ServiceRestaurant },
    { path: config.Routes.utilities, component: Utilities },

    { path: config.Routes.error, component: Error404, layout: null },
];

// required sign in
const privateRoute = [];

export { publishRoute, privateRoute };
