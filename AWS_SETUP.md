# 🔑 Guía para crear usuario IAM para GitHub Actions

## Si no tienes credenciales de AWS, sigue estos pasos:

### 1. Crear usuario IAM
1. Ve a AWS Console → IAM → Users
2. Click "Add users"
3. Username: `github-actions-user`
4. Select "Programmatic access"

### 2. Asignar permisos
Attach estas policies:
- `AWSElasticBeanstalkFullAccess`
- `AmazonS3FullAccess`
- `AmazonEC2FullAccess`

### 3. Obtener credenciales
- Descarga el CSV con las credenciales
- O copia el Access Key ID y Secret Access Key

### 4. Configurar en GitHub
Repository → Settings → Secrets and variables → Actions

**Secrets necesarios:**
```
AWS_ACCESS_KEY_ID = AKIA...
AWS_SECRET_ACCESS_KEY = wJalrXUt...
```

## 🔒 Seguridad
- Nunca compartas estos secrets
- Puedes rotar las keys regularmente
- El usuario solo necesita permisos de Elastic Beanstalk

## 🆘 Alternativa: Usar las credenciales del entorno actual
Si ya tienes el entorno AWS funcionando, puedes usar esas mismas credenciales.