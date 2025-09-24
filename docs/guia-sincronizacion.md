# 🔄 GUÍA COMPLETA DE SINCRONIZACIÓN DE BASES DE DATOS

## 📋 ORDEN DE EJECUCIÓN:

### **PASO 1: LIMPIAR BASES LOCALES (XAMPP)**

1. **Abrir phpMyAdmin** o tu cliente MySQL
2. **Ejecutar el script** `scripts/limpiar-bases-xampp.sql`
3. **Verificar** que ambas bases (`ligas_db` y `ligas_db_test`) estén vacías

### **PASO 2: EJECUTAR TESTS SIN BASE DE DATOS**

```bash
# Ejecutar tests para verificar lógica sin BD
npm test
```

**✅ Resolver errores que NO sean de base de datos**

### **PASO 3: SINCRONIZAR BASES LOCALES**

```bash
# Ejecutar script automático de sincronización
npm run sync-all
```

**O manualmente:**

```bash
# Migrar desarrollo
npm run migrate:dev

# Migrar testing
npm run migrate:test

# Ejecutar tests
npm test
```

### **PASO 4: DESPLEGAR A PRODUCCIÓN**

```bash
# Hacer commit y push
git add .
git commit -m "Sincronizar bases de datos: agregar migraciones y endpoints"
git push origin feature/juan
```

### **PASO 5: MIGRAR PRODUCCIÓN**

**Una vez desplegado, ejecutar endpoints:**

1. **Limpiar producción:**
   ```
   POST http://liga-inyeccion-env.eba-p3jydbcq.us-east-1.elasticbeanstalk.com/clean-production-db
   ```

2. **Ejecutar migraciones:**
   ```
   POST http://liga-inyeccion-env.eba-p3jydbcq.us-east-1.elasticbeanstalk.com/run-migrations
   ```

### **PASO 6: VERIFICAR FUNCIONAMIENTO**

**Probar todos los endpoints:**
- `/api/ligas`
- `/api/temporadas`
- `/api/equipos`
- `/api/jugadores`
- `/api/partidos`
- `/api/resultados`
- `/api/usuarios`
- `/api/tabla-posiciones`

## 🎯 RESULTADO ESPERADO:

✅ **Desarrollo:** Estructura limpia y consistente
✅ **Testing:** Estructura limpia y consistente  
✅ **Producción:** Estructura limpia y consistente
✅ **Tests:** Todos pasando
✅ **API:** Todos los endpoints funcionando

## 🚨 RESOLUCIÓN DE PROBLEMAS:

### Si fallan los tests:
1. Verificar conexión a XAMPP
2. Verificar que las bases estén limpias
3. Ejecutar migraciones manualmente

### Si falla la migración de producción:
1. Usar el endpoint `/clean-production-db`
2. Revisar logs de Elastic Beanstalk
3. Verificar variables de entorno

### Si fallan los endpoints:
1. Verificar que las tablas se crearon
2. Verificar la inyección de dependencias
3. Revisar logs de la aplicación