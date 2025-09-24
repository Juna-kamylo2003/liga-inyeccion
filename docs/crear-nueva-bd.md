# Script para crear nueva instancia RDS

## 1. Crear nueva instancia RDS en AWS

### Configuración recomendada:
- **Engine**: MariaDB 10.11
- **Instance Class**: db.t3.micro (Free Tier)
- **Storage**: 20 GB GP2
- **Database Name**: liga_db_clean
- **Master Username**: admin
- **Master Password**: (generar nueva contraseña segura)
- **VPC**: misma VPC que el Elastic Beanstalk
- **Security Group**: permitir acceso desde el security group de EB
- **Port**: 3306

## 2. Pasos en AWS Console:

1. Ir a RDS Dashboard
2. Click "Create database"
3. Seleccionar "Standard create"
4. Engine: MariaDB
5. Version: 10.11 (latest)
6. Template: Free tier
7. Settings:
   - DB instance identifier: `liga-db-clean`
   - Master username: `admin`
   - Master password: `[NUEVA_CONTRASEÑA_SEGURA]`
8. Instance configuration:
   - DB instance class: db.t3.micro
9. Storage:
   - Storage type: General Purpose SSD (gp2)
   - Allocated storage: 20 GB
10. Connectivity:
    - VPC: vpc-0030f891dcd859279 (misma del EB)
    - Subnet group: default
    - Public access: No
    - VPC security groups: Create new
    - Availability Zone: No preference
11. Database authentication: Password authentication
12. Additional configuration:
    - Initial database name: `liga_db_clean`
    - Backup retention: 7 days
    - Monitoring: Disable enhanced monitoring

## 3. Configurar Security Group:
- Permitir tráfico MySQL/Aurora (port 3306) desde el security group de Elastic Beanstalk
- Source: sg-0245e98ac5c1cb40b,sg-05668bf690287c21f

## 4. Nuevas variables de entorno para EB:
```
DB_HOST=liga-db-clean.c41qc64cefby.us-east-1.rds.amazonaws.com
DB_NAME=liga_db_clean
DB_USER=admin
DB_PASSWORD=[NUEVA_CONTRASEÑA]
DB_PORT=3306
DB_DIALECT=mariadb
```