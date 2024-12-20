# Demo Contract

## 1. Run Development

### 1.1Clone the project

```bash
  git clone
```

### 1.2 Create file env

```bash
cp .env_example .env
```

### 1.3 Install package

```bash
  npm install -g win-node-env
```

```bash
  npm install
```

### 1.3 Test Contract

```bash
  npm run test test/{file}
```

### 1.5 Deploy

### 1.5.1 Deploy Demo Token

```bash
  npm run deploy:dev_sepolia scripts/{file}
```

### 1.5.2 Verify

```bash
  npm run verify:dev_sepolia {address} {params}
```
