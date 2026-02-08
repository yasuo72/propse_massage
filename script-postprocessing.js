// Post-Processing Effects Module
// This file contains advanced post-processing effects for the proposal website

// Note: To use these effects, you need to include the Three.js post-processing scripts
// Add these to your HTML before script.js:
// <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/EffectComposer.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/RenderPass.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/ShaderPass.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/shaders/CopyShader.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/shaders/LuminosityHighPassShader.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/UnrealBloomPass.js"></script>

class PostProcessingEffects {
    constructor(renderer, scene, camera) {
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
        this.composer = null;
        this.bloomPass = null;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        try {
            // Create composer
            this.composer = new THREE.EffectComposer(this.renderer);
            this.composer.setSize(window.innerWidth, window.innerHeight);

            // Create render pass
            const renderPass = new THREE.RenderPass(this.scene, this.camera);
            this.composer.addPass(renderPass);

            // Create bloom pass
            this.bloomPass = new THREE.UnrealBloomPass(
                new THREE.Vector2(window.innerWidth, window.innerHeight),
                1.5,  // strength
                0.4,  // radius
                0.85  // threshold
            );
            this.bloomPass.threshold = 0.2;
            this.bloomPass.strength = 1.2;
            this.bloomPass.radius = 0.5;
            this.composer.addPass(this.bloomPass);

            this.initialized = true;
            console.log('Post-processing initialized successfully');
        } catch (error) {
            console.warn('Post-processing not available:', error.message);
            console.log('Make sure to include the post-processing scripts in HTML');
        }
    }

    render() {
        if (this.initialized && this.composer) {
            this.composer.render();
        } else {
            this.renderer.render(this.scene, this.camera);
        }
    }

    resize(width, height) {
        if (this.composer) {
            this.composer.setSize(width, height);
        }
    }

    setBloomStrength(strength) {
        if (this.bloomPass) {
            this.bloomPass.strength = strength;
        }
    }

    setBloomThreshold(threshold) {
        if (this.bloomPass) {
            this.bloomPass.threshold = threshold;
        }
    }

    setBloomRadius(radius) {
        if (this.bloomPass) {
            this.bloomPass.radius = radius;
        }
    }
}

// Custom Shaders for Special Effects

// Heart Glow Shader
const HeartGlowShader = {
    uniforms: {
        'tDiffuse': { value: null },
        'time': { value: 0 },
        'color': { value: new THREE.Color(0xFF1744) }
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float time;
        uniform vec3 color;
        varying vec2 vUv;
        
        void main() {
            vec4 texel = texture2D(tDiffuse, vUv);
            
            // Create heart-shaped vignette
            vec2 center = vec2(0.5, 0.5);
            vec2 uv = vUv - center;
            float heart = pow(uv.x * uv.x + uv.y * uv.y - 0.25, 2.0);
            float glow = 1.0 - smoothstep(0.0, 0.5, heart);
            
            // Add pulsing effect
            float pulse = 0.5 + 0.5 * sin(time * 2.0);
            
            // Mix with color
            vec3 finalColor = mix(texel.rgb, color, glow * 0.3 * pulse);
            
            gl_FragColor = vec4(finalColor, texel.a);
        }
    `
};

// Rose Petal Shader
const RosePetalShader = {
    uniforms: {
        'time': { value: 0 },
        'windStrength': { value: 1.0 }
    },
    vertexShader: `
        uniform float time;
        uniform float windStrength;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
            vUv = uv;
            
            // Add wave motion
            float wave = sin(position.x * 2.0 + time) * 0.1;
            float wave2 = cos(position.y * 3.0 + time * 1.5) * 0.05;
            
            vec3 pos = position;
            pos.x += wave * windStrength;
            pos.y += wave2 * windStrength;
            
            vElevation = pos.y;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,
    fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
            // Create gradient from pink to red
            vec3 color1 = vec3(1.0, 0.09, 0.27);  // #FF1744
            vec3 color2 = vec3(1.0, 0.4, 0.4);   // Lighter pink
            
            float mixFactor = smoothstep(-2.0, 2.0, vElevation);
            vec3 color = mix(color1, color2, mixFactor);
            
            // Add subtle glow
            float glow = 0.8 + 0.2 * sin(time * 3.0);
            
            gl_FragColor = vec4(color * glow, 0.9);
        }
    `
};

// Diamond Sparkle Shader
const DiamondSparkleShader = {
    uniforms: {
        'time': { value: 0 },
        'sparkleIntensity': { value: 1.0 }
    },
    vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        
        void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewPosition = -mvPosition.xyz;
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragmentShader: `
        uniform float time;
        uniform float sparkleIntensity;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        
        void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewPosition);
            
            // Calculate reflection
            vec3 reflection = reflect(-viewDir, normal);
            
            // Create sparkle effect
            float sparkle = pow(max(0.0, reflection.y), 32.0) * sparkleIntensity;
            
            // Add rainbow dispersion
            float rainbow = sin(time * 2.0 + reflection.x * 10.0) * 0.5 + 0.5;
            vec3 color = mix(
                vec3(1.0, 0.8, 0.9),  // Pink
                vec3(0.8, 0.9, 1.0),  // Blue
                rainbow
            );
            
            // Add white sparkle
            color += vec3(sparkle);
            
            gl_FragColor = vec4(color, 0.9);
        }
    `
};

// Firework Particle Shader
const FireworkParticleShader = {
    uniforms: {
        'time': { value: 0 },
        'color': { value: new THREE.Color(0xFF1744) }
    },
    vertexShader: `
        attribute float size;
        attribute float alpha;
        varying float vAlpha;
        
        void main() {
            vAlpha = alpha;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragmentShader: `
        uniform vec3 color;
        varying float vAlpha;
        
        void main() {
            // Create circular particle
            vec2 center = gl_PointCoord - vec2(0.5);
            float dist = length(center);
            if (dist > 0.5) discard;
            
            // Soft edge
            float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
            alpha *= vAlpha;
            
            gl_FragColor = vec4(color, alpha);
        }
    `
};

// Confetti Shader
const ConfettiShader = {
    uniforms: {
        'time': { value: 0 },
        'color': { value: new THREE.Color(0xFFD700) }
    },
    vertexShader: `
        attribute float rotation;
        attribute float scale;
        varying vec2 vUv;
        
        void main() {
            vUv = uv;
            
            // Apply rotation
            float c = cos(rotation);
            float s = sin(rotation);
            mat2 rotMat = mat2(c, -s, s, c);
            
            vec2 rotatedPos = rotMat * position.xy;
            
            vec4 mvPosition = modelViewMatrix * vec4(rotatedPos, position.z, 1.0);
            mvPosition.xy *= scale;
            
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragmentShader: `
        uniform vec3 color;
        varying vec2 vUv;
        
        void main() {
            // Add slight gradient
            float gradient = vUv.y * 0.3 + 0.7;
            gl_FragColor = vec4(color * gradient, 1.0);
        }
    `
};

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PostProcessingEffects,
        HeartGlowShader,
        RosePetalShader,
        DiamondSparkleShader,
        FireworkParticleShader,
        ConfettiShader
    };
}
