import Home from '../pages/Home';
import HistoryTransaction from '../pages/HistoryTransaction';
import InfoGuest from '../pages/InfoGuest';
import ListOrderRoom from '../pages/ListOrderRoom';
import ListTypeRoom from '../pages/ListTypeRoom/ListTypeRoom.js';
import ListRoom from '../pages/ListRoom/ListRoom.js';
import Utilities from '../pages/Utilities';
import DetailInfo from '../pages/DetaiInfo/DetaiInfo';
import DetailOrderRoom from '../pages/DetailOrderRoom';

import Error404 from '../pages/Error404';

import config from '../config';

const publishRoute = [
    { path: config.Routes.home, component: Home },
    { path: config.Routes.historyTransaction, component: HistoryTransaction },

    { path: config.Routes.infoGuest, component: InfoGuest },
    { path: config.Routes.detaiInfo, component: DetailInfo },

    { path: config.Routes.listOrderRoom, component: ListOrderRoom },
    { path: config.Routes.detaiOrderRoom, component: DetailOrderRoom },

    { path: config.Routes.listTypeRoom, component: ListTypeRoom },
    { path: config.Routes.listRoom, component: ListRoom },

    { path: config.Routes.utilities, component: Utilities },

    { path: config.Routes.error, component: Error404, layout: null },
];

// required sign in
const privateRoute = [];

export { publishRoute, privateRoute };
