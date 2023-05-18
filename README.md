# kaam


## How To Use:

### Icons
 - Icons component is added to component folder.

go to your desired JSX function and...

```javascript
import Icons from '../../components/Icons';


const App = ()=>{

    // ... your code
    return (
        <>
        <Icons name={"caret-up"} type={"button"} onPress={() => { }} shape={"round"} size={10} />
        </>
    )
}
// we use font awesome icons so get the names from font awesome library
// link : https://oblador.github.io/react-native-vector-icons/

```