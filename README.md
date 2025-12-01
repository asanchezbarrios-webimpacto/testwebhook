# Test Webhook - Versionado Automático

Proyecto simple para probar un sistema de versionado automático que incrementa la versión cada vez que se hace merge a `devel` o `main`.

## Estructura

- `VERSION`: Archivo que contiene la versión actual
- `package.json`: Configuración del proyecto Node.js
- `index.js`: Archivo principal simple
- `scripts/version.js`: Script para incrementar la versión
- `.github/workflows/auto-version.yml`: Workflow de GitHub Actions para versionado automático

## Cómo funciona

1. **Merge a `devel`**: Incrementa el patch (0.0.1 → 0.0.2)
2. **Merge a `master`**: Incrementa el minor (0.0.1 → 0.1.0)

El workflow de GitHub Actions se ejecuta automáticamente cuando se hace push a estas ramas y:
- Incrementa la versión
- Actualiza `VERSION` y `package.json`
- Hace commit del cambio
- Crea un tag de Git con la nueva versión

## Uso manual

Si quieres incrementar la versión manualmente:

```bash
# Incrementar patch (0.0.1 → 0.0.2)
npm run version:patch

# Incrementar minor (0.0.1 → 0.1.0)
npm run version:minor

# Incrementar major (0.0.1 → 1.0.0)
npm run version:major
```

## Ejecutar el proyecto

```bash
npm start
```

Esto iniciará un servidor web en `http://localhost:3000` donde podrás ver:
- Un mensaje "Hola Mundo"
- La versión actual del proyecto
- Un botón para cambiar el mensaje (solo para demostración)

Cada vez que cambies el contenido de `public/index.html` o cualquier archivo y hagas merge a `devel` o `master`, la versión se incrementará automáticamente.

## Configuración de Permisos en GitHub

Para que el workflow pueda hacer push automáticamente, necesitas configurar los permisos:

### Opción 1: Configuración del Repositorio (Recomendado)

1. Ve a tu repositorio en GitHub
2. Click en **Settings** → **Actions** → **General**
3. En la sección **Workflow permissions**, selecciona:
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**
4. Click en **Save**

### Opción 2: Usar Personal Access Token (PAT)

Si la opción 1 no funciona o necesitas más control:

1. Ve a GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Genera un nuevo token con permisos `repo`
3. En tu repositorio, ve a **Settings** → **Secrets and variables** → **Actions**
4. Crea un nuevo secret llamado `PAT` con el valor de tu token
5. Actualiza el workflow para usar `${{ secrets.PAT }}` en lugar de `${{ secrets.GITHUB_TOKEN }}`

## Notas

- El workflow ya incluye los permisos necesarios (`contents: write`)
- El workflow usa `[skip ci]` en el mensaje de commit para evitar bucles infinitos
- Si usas la Opción 1, no necesitas hacer nada más, el workflow funcionará automáticamente

