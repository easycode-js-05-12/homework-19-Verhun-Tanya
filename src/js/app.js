import { LoginComponent} from './components/login.component';
import { HomeComponent } from './components/home.component';
import { SignUpComponent } from './components/signup.component';
import { NotFoundComponent} from './components/notfound.component';
import { UserComponent } from './components/user.component';
import { PaymentComponent } from './components/payment.component';
import { NavbarComponent } from './components/navbar.component';
import { WinnersComponent } from './components/winners.component';
import { ActiveRoute } from './core/active.route.service';
import { NewsComponent } from './components/news.component';
import { AuthGuard } from './guard/auth.guard';
import { PaymentGuard } from './guard/payment.guard';


const activeRoute = new ActiveRoute();
const authGuard = new AuthGuard();
const paymentGuard = new PaymentGuard();

const routes = {
    '/': {
        component: new HomeComponent(),
        guard: [authGuard]
    }, 
    '/login': {
        component: new LoginComponent()
    },
    '/signup': {
        component: new SignUpComponent()
    },
    '/users/:id': {
        component: new UserComponent(),
        guard: [authGuard]
    },
    '/news': {
        component: new NewsComponent(),
        guard: [authGuard]
    },
    '/payments': {
        component: new PaymentComponent(),
        guard: [authGuard, paymentGuard]
    },
    '/winners?part=1&limit=15': {
        component: new WinnersComponent(),
        guard: [authGuard]
    },
    '**': {
        component: new NotFoundComponent()
    },
};



const router = async () => {
    const header = document.querySelector('app-header');
    const container = document.querySelector('app-container');
    const request = activeRoute.parseRequestUrl();
    const url = (request.resourse ? '/' + request.resourse: '/') + (request.id ? '/:id' : '');

    const component = routes[url] ? routes[url]['component'] : routes['**']['component'];
    const guards = routes[url] ? routes[url]['guard'] : null;

    if (guards) {
        const guardState = guards.every((item) => item.canActivate());
        if (!guardState) return;
    }

    if (header) {
        const navbarComponent = new NavbarComponent();
        await navbarComponent.beforeRender();
        header.innerHTML = navbarComponent.render();
        navbarComponent.afterRender();
    }
    
    await component.beforeRender();
    container.innerHTML = component.render();
    component.afterRender();
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router); 
