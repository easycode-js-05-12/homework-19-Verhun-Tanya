import { AuthService } from './../services/auth.service';

export class SignUpComponent {
    constructor() {
        this._autService = new AuthService(); 
    }

    async beforeRender() {
        
    }
    render() {
        return `
        <div class="auth-wrap d-flex">
        <div class="auth-form col col-6 mx-auto my-auto">
            <h3>Sign Up to Social.</h3>
            <p class="text-secondary">It's awesome here... Enter.</p>
            <form name="signUpForm" novalidate>
                <div class="form-group">
                    <div class="row">
                        <div class="col col-6">
                            <input type="text" class="form-control form-control-sm" id="first_name" placeholder="First Name">
                        </div>
                        <div class="col col-6">
                            <input type="text" class="form-control form-control-sm" id="last_name" placeholder="Last Name">
                        </div>
                    </div>

                    <input type="text" class="form-control form-control-sm mt-3" id="nick_name" placeholder="Nick Name">

                    <div class="row mt-3">
                        <div class="col col-4">
                            <input type="text" class="form-control form-control-sm" id="day_of_birth" placeholder="Day">
                        </div>
                        <div class="col col-4">
                            <input type="text" class="form-control form-control-sm" id="month_of_birth" placeholder="Month">
                        </div>
                        <div class="col col-4">
                            <input type="text" class="form-control form-control-sm" id="year_of_birth" placeholder="Year">
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col col-6">
                            <input type="text" class="form-control form-control-sm" id="country" placeholder="Country">
                        </div>
                        <div class="col col-6">
                            <input type="text" class="form-control form-control-sm" id="city" placeholder="City">
                        </div>
                    </div>

                    <select name="gender" id="gender" class="form-control form-control-sm mt-3">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>

                    <input type="email" class="form-control form-control-sm mt-3" id="email" placeholder="name@example.com" required data-pattern="^\S+@[a-z]+\.[a-z]+$">
                    <input type="text" class="form-control form-control-sm mt-3" id="phone" placeholder="Phone number">
                    <input type="password" class="form-control form-control-sm mt-3" id="password" placeholder="password" required data-pattern="\S+">
                    <div class="d-flex mt-5">
                        <button type="submit" class="btn btn-primary btn-sm">Sign Up</button>
                        <a href="login.html" class="btn btn-link btn-sm ml-auto">Already have an account? Sign in</a>
                    </div>
                </div>
            </form>
        </div>
        <!-- /.auth-form -->
        <div class="auth-bg col col-6">

        </div>
        <!-- /.auth-bg -->
    </div>
    <!-- /.auth-wrap -->
        `;

    }

    afterRender() {
        document.forms['signUpForm'].addEventListener('submit', (e) => {
            e.preventDefault();

            const userInfo = {
                email: document.forms['signUpForm'].elements['email'].value,
                password: document.forms['signUpForm'].elements['password'].value,
                nickname: document.forms['signUpForm'].elements['nick_name'].value,
                first_name: document.forms['signUpForm'].elements['first_name'].value,
                last_name: document.forms['signUpForm'].elements['last_name'].value,
                phone: document.forms['signUpForm'].elements['phone'].value,
                gender_orientation: document.forms['signUpForm'].elements['gender'].value,
                city: document.forms['signUpForm'].elements['city'].value,
                country: document.forms['signUpForm'].elements['country'].value,
                date_of_birth_day: document.forms['signUpForm'].elements['day_of_birth'].value,
                date_of_birth_month: document.forms['signUpForm'].elements['month_of_birth'].value,        
                date_of_birth_year: document.forms['signUpForm'].elements['year_of_birth'].value
            }

            this._autService.signup(userInfo)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
        });
    }
}