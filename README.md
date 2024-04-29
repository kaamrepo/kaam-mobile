# kaam


## How To Use:

### Icons
 - Icons component is added to component folder.

go to your desired JSX function and...

```javascript
import Icon, {Icons} from '../../components/Icons';


const App = () => {

    return (
        <Icon name={"caret-up"} type={Icons.Ionicon} size={10} />
    )
}
// link : https://oblador.github.io/react-native-vector-icons/

```


dropdown element

package : react-native-element-dropdown
documentation link: https://www.npmjs.com/package/react-native-element-dropdown


generate SHA256

cd android/

gradlew signingReport


Release Apk instructions:

https://medium.com/geekculture/react-native-generate-apk-debug-and-release-apk-4e9981a2ea51

step 1:
keytool -genkey -v -keystore kaam.keystore -alias kaam -keyalg RSA -keysize 2048 -validity 10000

step 2:
mv my-release-key.keystore /android/app

step 3:




> Task :app:signingReport
Variant: debug
Config: debug
Store: /media/sidheshp/72FC82C8FC8285D7/Sidhesh/Learning/React Native/lineup/kaam-mobile/android/app/debug.keystore
Alias: androiddebugkey
MD5: 20:F4:61:48:B7:2D:8E:5E:5C:A2:3D:37:A4:F4:14:90
SHA1: 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
SHA-256: FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C
Valid until: Wednesday, May 1, 2052
----------
Variant: release
Config: debug
Store: /media/sidheshp/72FC82C8FC8285D7/Sidhesh/Learning/React Native/lineup/kaam-mobile/android/app/debug.keystore
Alias: androiddebugkey
MD5: 20:F4:61:48:B7:2D:8E:5E:5C:A2:3D:37:A4:F4:14:90
SHA1: 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
SHA-256: FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C
Valid until: Wednesday, May 1, 2052
----------
Variant: debugAndroidTest
Config: debug
Store: /media/sidheshp/72FC82C8FC8285D7/Sidhesh/Learning/React Native/lineup/kaam-mobile/android/app/debug.keystore
Alias: androiddebugkey
MD5: 20:F4:61:48:B7:2D:8E:5E:5C:A2:3D:37:A4:F4:14:90
SHA1: 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
SHA-256: FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C
Valid until: Wednesday, May 1, 2052