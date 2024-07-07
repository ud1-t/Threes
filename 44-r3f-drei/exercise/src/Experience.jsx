import { OrbitControls, TransformControls, PivotControls, Html, Text, Float, MeshReflectorMaterial } from '@react-three/drei'
import { useRef } from 'react'
import './style.css'

export default function Experience()
{
    const cubeRef = useRef()
    const sphereRef = useRef()

    return <>
        
        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <PivotControls
            anchor={ [ 0, 0, 0 ] }
            depthTest={ false }
            lineWidth={ 2 }
            axisColors={ [ '#ff0000', '#00ff00', '#0000ff' ] }
            scale={ 100 }
            fixed={ true }
        >
            <mesh ref={ sphereRef } position-x={ - 2 }>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
                <Html
                    position={ [ 1, 1, 0 ] }
                    wrapperClass="label"
                    center
                    distanceFactor={ 6 }
                    // occlude={ [ sphereRef, cubeRef ] }
                >
                    That's a sphere
                </Html>
            </mesh>
        </PivotControls>

        <mesh ref={ cubeRef } position-x={ 2 } scale={ 1.5 }>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <TransformControls object={ cubeRef } mode='translate' />

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            {/* <meshStandardMaterial color="greenyellow" /> */}
            <MeshReflectorMaterial
                resolution={ 512 }
                blur={ [1000, 1000] }
                mixBlur={ 0.75 }
                mirror={ 0.75 }
                color="skyblue"
            />
        </mesh>

        <Float
            speed={ 2 }
            floatIntensity={ 5 }
        >
            <Text
                font='./bangers-v20-latin-regular.woff'
                color="salmon"
                position-y={ 2 }
                maxWidth={ 2 }
                textAlign='center'
            >
                I LOVE R3F
                <meshNormalMaterial />
            </Text>
        </Float>

    </>
}