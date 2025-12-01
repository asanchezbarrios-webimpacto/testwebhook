# Conventional Commits - Guía de Versionado Automático

El sistema de versionado automático determina el tipo de incremento basándose en los mensajes de commit usando **Conventional Commits**.

## Cómo funciona

Cuando haces merge a `master`, el sistema analiza los mensajes de commit y determina automáticamente:

### 🔴 MAJOR (1.0.0 → 2.0.0)
Se incrementa cuando detecta:
- `BREAKING CHANGE` en el mensaje
- `major` en el mensaje
- `!:` en el tipo de commit (ej: `feat!: nueva API`)
- `breaking` en el mensaje

**Ejemplos:**
```
feat!: Cambio en la API que rompe compatibilidad
BREAKING CHANGE: Se eliminó el endpoint /api/v1
major: Refactorización completa del sistema
```

### 🟡 MINOR (0.1.0 → 0.2.0)
Se incrementa cuando detecta:
- `feat:` o `feature:` al inicio del commit
- `minor` en el mensaje
- `new.*feature` en el mensaje

**Ejemplos:**
```
feat: Agregar nueva funcionalidad de búsqueda
feature: Implementar sistema de notificaciones
minor: Nueva característica de exportación
```

### 🟢 PATCH (0.1.0 → 0.1.1)
Se incrementa por defecto para:
- `fix:` correcciones de bugs
- `docs:` cambios en documentación
- `style:` cambios de formato
- `refactor:` refactorizaciones sin cambios funcionales
- `test:` agregar o modificar tests
- `chore:` tareas de mantenimiento
- Cualquier otro commit sin palabras clave

**Ejemplos:**
```
fix: Corregir error en cálculo de precios
docs: Actualizar README
refactor: Mejorar estructura del código
chore: Actualizar dependencias
```

## Recomendaciones

Para aprovechar al máximo el versionado automático:

1. **Usa Conventional Commits** en tus mensajes:
   ```
   feat: Agregar login con Google
   fix: Corregir error de validación
   docs: Actualizar documentación de API
   ```

2. **Para cambios mayores**, incluye `BREAKING CHANGE`:
   ```
   feat!: Cambiar formato de respuesta de API
   
   BREAKING CHANGE: La respuesta ahora incluye un campo adicional requerido
   ```

3. **Para nuevas features**, usa `feat:` al inicio:
   ```
   feat: Implementar sistema de pagos
   ```

4. **Para correcciones**, usa `fix:`:
   ```
   fix: Resolver problema de memoria en procesamiento de imágenes
   ```

## Verificación

Puedes verificar qué tipo de cambio se detectará revisando los commits antes de hacer merge a `master`.

