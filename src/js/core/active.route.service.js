export class ActiveRoute {
    parseRequestUrl() {
        const url = location.hash.slice(1).toLowerCase() || '/';
        const routes = url.split('/');
        console.log(routes);
        return {
            resourse: routes[1],
            id: routes[2],
            url
        }
    }
}