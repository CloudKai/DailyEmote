import { Redirect, useNavigation, useRouter } from 'expo-router';

const index = () => {
    const navigation = useNavigation();
    const router = useRouter();
    return (
        <Redirect href="/signin" />
    )
}

export default index