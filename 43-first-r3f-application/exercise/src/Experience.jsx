import { useFrame, extend, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import CustomObject from './CustomObject.jsx'

extend({ OrbitControls})

export default function Experience()
{
    const { camera, gl } = useThree()
    const cubeRef = useRef()
    const groupRef = useRef()

    useFrame((state, delta) =>
    {
        // groupRef.current.rotation.y += delta
        cubeRef.current.rotation.y += delta

        // const angle = state.clock.elapsedTime
        // state.camera.position.x = Math.sin(angle) * 8
        // state.camera.position.z = Math.cos(angle) * 8

        // state.camera.lookAt(0, 0, 0)
    })

    return <>

        <orbitControls args={ [ camera, gl.domElement ] } /> 

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 }/>
        <ambientLight intensity={ 0.5 } />

        <group ref={ groupRef }>
            <mesh ref={ cubeRef } rotation-y={ Math.PI * 0.25 } position-x={ 2 } scale={ 1.5 }>
                <boxGeometry />
                <meshStandardMaterial color= "mediumPurple" />
            </mesh>

            <mesh position-x={ -2 }>
                <sphereGeometry />
                <meshStandardMaterial color= "orange" />
            </mesh>
        </group>

        <mesh rotation-x={ -Math.PI * 0.50 } position-y={ -1 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color= "greenyellow" />
        </mesh>

        <CustomObject />
    </>
}