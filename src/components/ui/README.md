# Componentes UI Personalizados

Este directorio contiene componentes UI personalizados que evitan el uso de `!important` en los estilos.

## CustomButton.jsx

### Componentes disponibles:

#### 1. PrimaryButton
Botón principal con estilos personalizados usando styled-components.

```jsx
import { PrimaryButton } from '../ui/CustomButton';

<PrimaryButton onClick={handleClick}>
  Mi Botón
</PrimaryButton>
```

#### 2. CircularActionButton
Botón circular para acciones (ideal para iconos).

```jsx
import { CircularActionButton } from '../ui/CustomButton';
import { FaHeart } from 'react-icons/fa';

<CircularActionButton>
  <FaHeart />
</CircularActionButton>
```

#### 3. CustomButtonWithSx
Botón usando la prop `sx` de Material UI.

```jsx
import { CustomButtonWithSx } from '../ui/CustomButton';

<CustomButtonWithSx variant="contained">
  Mi Botón
</CustomButtonWithSx>
```

## Ventajas de este enfoque:

1. **Sin !important**: Los estilos tienen la especificidad correcta
2. **Reutilizable**: Los componentes se pueden usar en toda la aplicación
3. **Mantenible**: Cambios centralizados en un solo lugar
4. **Consistente**: Todos los botones siguen el mismo diseño
5. **Flexible**: Fácil de extender y personalizar

## Tema Global

El archivo `src/theme/theme.js` contiene la configuración global de Material UI que:

- Define colores primarios y secundarios
- Personaliza componentes por defecto (Button, Badge, Tabs, etc.)
- Elimina la necesidad de `!important` en la mayoría de casos

## Migración desde estilos con !important

Para migrar estilos existentes:

1. Identifica el componente que necesita personalización
2. Crea un styled-component o usa la prop `sx`
3. Mueve los estilos al tema global si aplican a toda la aplicación
4. Reemplaza las clases CSS con los nuevos componentes

## Ejemplo de migración:

**Antes:**
```css
.mi-boton {
  background-color: #ff5252 !important;
  color: #fff !important;
}
```

**Después:**
```jsx
const MiBoton = styled(Button)({
  backgroundColor: '#ff5252',
  color: '#fff',
});