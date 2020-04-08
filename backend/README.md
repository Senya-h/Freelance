# Freelance BackEnd

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
---
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
---
Prideda portfolio darbą:
```bash
/api/work&id=:user_id
```
Atnaujiną portfolio darbą:
```bash
/api/update/work&id=:work_id
```
Trina portfolio darbą:
```bash
/api/delete/work&id=:work_id
```