# 🚀 Configuración de Secrets para CD Pipeline

## Secrets de AWS requeridos en GitHub

Para que el deployment automático funcione, necesitas configurar estos secrets en GitHub:

### 1. AWS_ACCESS_KEY_ID
- Ve a GitHub Repository → Settings → Secrets and variables → Actions
- Click en "New repository secret"
- Name: `AWS_ACCESS_KEY_ID`
- Value: Tu AWS Access Key ID

### 2. AWS_SECRET_ACCESS_KEY
- Name: `AWS_SECRET_ACCESS_KEY`  
- Value: Tu AWS Secret Access Key

## 🔧 Cómo obtener las credenciales de AWS

1. Ve a AWS Console → IAM → Users
2. Selecciona tu usuario o crea uno nuevo
3. Ve a "Security credentials"
4. Click en "Create access key"
5. Selecciona "Command Line Interface (CLI)"
6. Copia el Access Key ID y Secret Access Key

## 📋 Permisos requeridos para el usuario IAM

El usuario de AWS necesita estos permisos:
- `AWSElasticBeanstalkFullAccess`
- `AmazonS3FullAccess` 
- `AmazonEC2FullAccess`
- `IAMReadOnlyAccess`

## 🎯 Entornos de Deployment

### Production (main branch)
- Environment: `liga-api-env`
- URL: `http://liga-api-env.eba-mmvhpbqm.us-east-1.elasticbeanstalk.com`

### Staging (feature/juan branch)  
- Environment: `liga-api-staging-env`
- URL: `http://liga-api-staging-env.eba-mmvhpbqm.us-east-1.elasticbeanstalk.com`

## 🔄 Cómo funciona el CD

1. **Trigger**: Push a `main` o `feature/juan`
2. **CI**: Se ejecuta el pipeline de tests
3. **CD**: Si los tests pasan, se deploya automáticamente
4. **Health Check**: Verifica que la API responda
5. **Rollback**: Si falla, se puede hacer rollback manual

## 📦 Qué se despliega

- Código fuente completo
- Dependencies de producción
- Configuración de Elastic Beanstalk
- Variables de entorno de producción

## 🚨 Troubleshooting

Si el deployment falla:
1. Revisa los logs en GitHub Actions
2. Revisa los logs en AWS Elastic Beanstalk Console
3. Verifica que los secrets estén configurados
4. Verifica que los entornos de AWS existan

## 🔍 Monitoreo

- **AWS Console**: Logs y métricas en Elastic Beanstalk
- **GitHub Actions**: Logs de deployment
- **Health Checks**: Automáticos en cada deployment