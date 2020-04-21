# Workify

## JWT Token Setup
1)
```bash
composer require tymon/jwt-auth "1.0.*" 
```
2)
```bash
php artisan jwt:secret
```

## Seeders
1) Sukuria 3 roles: 
    a) Admin
    b) Client
    c) Freelancer
2) Sukuria Admin. Email: info@freelance.lt, Password: admin123
3) Sukuria skillsus
```bash
php artisan db:seed
```

### Prisijungimas/Registracija
Register:
```bash
/api/register
```
Login:
```bash
/api/login
```
Refresh Token:
```bash
/api/new_token
```
---
## Password reset setup
Užpildyti duomenis užsiregistravus: https://mailtrap.io/

/.env
```bash
MAIL_DRIVER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=username
MAIL_PASSWORD=password
MAIL_FROM_ADDRESS=from@example.com
MAIL_FROM_NAME=Example
```
#### `Password reset API`
Įrašyti email:
```bash
/api/password/email
```
Įrašyti email, token(gautas emaile), password, password_confirmation
```bash
/api/password/reset
```
---
## Vartotojo informacija
User Info:
```bash
/api/user/:id
```
---
## Paslaugos
Prideda paslaugą (Vartotojas gali pridėti daugiau nei vieną paslaugą:
```bash
/api/service
```
Atnaujiną paslaugą:
```bash
/api/update/service&id=:service_id
```
Trina paslaugą:
```bash
/api/delete/service&id=:service_id
```
---
## Portfolio darbai
Prideda portfolio darbą (Vartotojas gali pridėti daugiau nei vieną darbą):
```bash
/api/work
```
Atnaujiną portfolio darbą:
```bash
/api/update/work&id=:work_id
```
Trina portfolio darbą:
```bash
/api/delete/work&id=:work_id
```
