/**
 * build.js
 * Script de build para minificação e otimização
 * 
 * Versão: 1.0.0
 * Data: 26 de janeiro de 2026
 * 
 * Uso: node build.js
 */

const fs = require('fs');
const path = require('path');

/**
 * MINIFICADOR SIMPLES DE CSS
 */
const minifyCSS = (css) => {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comentários
    .replace(/\n/g, '') // Remove quebras de linha
    .replace(/\s+/g, ' ') // Remove espaços múltiplos
    .replace(/\s*([{}:;,>+~])\s*/g, '$1') // Remove espaços ao redor de caracteres
    .trim();
};

/**
 * MINIFICADOR SIMPLES DE JAVASCRIPT
 */
const minifyJS = (js) => {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comentários multi-linha
    .replace(/\/\/.*/g, '') // Remove comentários single-line
    .replace(/\n/g, '') // Remove quebras de linha
    .replace(/\s+/g, ' ') // Remove espaços múltiplos
    .replace(/\s*([{}:;,()=[\]>+\-*/])\s*/g, '$1') // Remove espaços ao redor de operadores
    .trim();
};

/**
 * ANALISADOR DE TAMANHO
 */
const analyzeSize = (filename, original, minified) => {
  const originalSize = Buffer.byteLength(original, 'utf-8');
  const minifiedSize = Buffer.byteLength(minified, 'utf-8');
  const saved = originalSize - minifiedSize;
  const percentage = ((saved / originalSize) * 100).toFixed(2);

  console.log(`\n📊 ${filename}:`);
  console.log(`   Original:  ${(originalSize / 1024).toFixed(2)} KB`);
  console.log(`   Minified:  ${(minifiedSize / 1024).toFixed(2)} KB`);
  console.log(`   Saved:     ${(saved / 1024).toFixed(2)} KB (${percentage}%)`);

  return { originalSize, minifiedSize, saved };
};

/**
 * GERADOR DE SOURCE MAPS
 */
const generateSourceMap = (filename, original, minified) => {
  const sourceMap = {
    version: 3,
    file: filename,
    sources: [filename],
    mappings: ''
  };

  return JSON.stringify(sourceMap);
};

/**
 * PROCESSAMENTO DE ARQUIVO
 */
const processFile = (filepath, outputpath, minifier) => {
  try {
    const content = fs.readFileSync(filepath, 'utf-8');
    const minified = minifier(content);
    
    // Escreve arquivo minificado
    fs.writeFileSync(outputpath, minified);
    
    // Análise de tamanho
    const stats = analyzeSize(
      path.basename(filepath),
      content,
      minified
    );

    // Gera source map (opcional)
    const mapPath = outputpath + '.map';
    const sourceMap = generateSourceMap(
      path.basename(outputpath),
      content,
      minified
    );
    fs.writeFileSync(mapPath, sourceMap);

    return stats;
  } catch (error) {
    console.error(`❌ Erro ao processar ${filepath}:`, error.message);
    return null;
  }
};

/**
 * BUILD PRINCIPAL
 */
const build = () => {
  console.log('🔨 Iniciando build e otimização...\n');

  const frontendDir = path.join(__dirname, 'Frontend');
  const distDir = path.join(__dirname, 'dist');

  // Cria diretório dist se não existir
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  let totalStats = {
    files: 0,
    originalTotal: 0,
    minifiedTotal: 0,
    savedTotal: 0
  };

  // Processa CSS
  const cssFiles = ['style.css'];
  console.log('📄 Processando CSS...');
  
  cssFiles.forEach(file => {
    const input = path.join(frontendDir, file);
    const output = path.join(distDir, file.replace('.css', '.min.css'));
    
    if (fs.existsSync(input)) {
      const stats = processFile(input, output, minifyCSS);
      if (stats) {
        totalStats.files++;
        totalStats.originalTotal += stats.originalSize;
        totalStats.minifiedTotal += stats.minifiedSize;
        totalStats.savedTotal += stats.saved;
      }
    }
  });

  // Processa JavaScript
  const jsFiles = ['script.js', 'modules.js', 'lazy-loader.js', 'init.js', 'service-worker.js'];
  console.log('\n📜 Processando JavaScript...');
  
  jsFiles.forEach(file => {
    const input = path.join(frontendDir, file);
    const output = path.join(distDir, file.replace('.js', '.min.js'));
    
    if (fs.existsSync(input)) {
      const stats = processFile(input, output, minifyJS);
      if (stats) {
        totalStats.files++;
        totalStats.originalTotal += stats.originalSize;
        totalStats.minifiedTotal += stats.minifiedSize;
        totalStats.savedTotal += stats.saved;
      }
    }
  });

  // Copia arquivo HTML
  console.log('\n📝 Copiando HTML...');
  const htmlInput = path.join(frontendDir, 'index.html');
  const htmlOutput = path.join(distDir, 'index.html');
  
  if (fs.existsSync(htmlInput)) {
    fs.copyFileSync(htmlInput, htmlOutput);
    console.log(`   ✓ index.html copiado`);
  }

  // Copia imagens
  console.log('\n🖼️  Copiando imagens...');
  const imgDir = path.join(frontendDir, 'img');
  const distImgDir = path.join(distDir, 'img');
  
  if (fs.existsSync(imgDir)) {
    if (!fs.existsSync(distImgDir)) {
      fs.mkdirSync(distImgDir, { recursive: true });
    }
    
    const images = fs.readdirSync(imgDir);
    images.forEach(img => {
      fs.copyFileSync(
        path.join(imgDir, img),
        path.join(distImgDir, img)
      );
    });
    console.log(`   ✓ ${images.length} imagens copiadas`);
  }

  // Relatório final
  console.log('\n' + '='.repeat(50));
  console.log('✅ BUILD COMPLETO');
  console.log('='.repeat(50));
  console.log(`\n📦 Arquivos processados: ${totalStats.files}`);
  console.log(`📊 Tamanho total original:  ${(totalStats.originalTotal / 1024).toFixed(2)} KB`);
  console.log(`📊 Tamanho total minificado: ${(totalStats.minifiedTotal / 1024).toFixed(2)} KB`);
  console.log(`💾 Total economizado: ${(totalStats.savedTotal / 1024).toFixed(2)} KB`);
  console.log(`📈 Redução: ${((totalStats.savedTotal / totalStats.originalTotal) * 100).toFixed(2)}%`);
  console.log(`\n📂 Saída: ${distDir}`);
  console.log('\n✨ Arquivos minificados e otimizados com sucesso!\n');
};

// Executa build
build();
