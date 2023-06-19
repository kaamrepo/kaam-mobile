# kaam


## How To Use:

### Icons
 - Icons component is added to component folder.

go to your desired JSX function and...

```javascript
import Icon, {Icons} from '../../components/Icons';


const App = ()=>{

    // ... your code
    return (
        <>
        <Icon name={"caret-up"} type={Icons.Ionicon} size={10} />
        </>
    )
}
// we use font awesome icons so get the names from font awesome library
// link : https://oblador.github.io/react-native-vector-icons/

```