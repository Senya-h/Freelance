# Freelance BackEnd

## Seeders
Seederius paleist iš eilės

Sukuria 3 roles: 
    1) Admin
    2) Client
    3) Freelancer
```bash
php artisan db:seed --class=RoleTableSeeder
```
Sukuria Admin. Email: info@freelance.lt, Password: admin123
```bash
php artisan db:seed --class=UsersTableSeeder
```

## API
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
User Info:
```bash
/api/user/:id
```
Prideda paslaugą:
```bash
/api/service&id=:user_id
```
Atnaujiną paslaugą:
```bash
/api/update/service&id=:service_id
```
Trina paslaugą:
```bash
/api/delete/service&id=:service_id
```