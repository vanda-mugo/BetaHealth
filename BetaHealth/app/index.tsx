import React from 'react'
import { Redirect } from 'expo-router'

interface Props {}

function Index(props: Props) {
    const {} = props

    return <Redirect href="/(tabs)" />;
}

export default Index
