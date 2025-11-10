# GitHub Pages 배포 가이드

Hugo 사이트를 GitHub Pages에 배포하는 방법을 안내합니다.

## 사전 준비

1. **GitHub 저장소 생성**
   - GitHub에서 새 저장소를 만듭니다
   - 저장소 이름은 원하는 대로 설정 (예: `my-hugo-site`)

2. **로컬 Git 저장소 초기화** (아직 안 했다면)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **GitHub 저장소 연결**
   ```bash
   git remote add origin https://github.com/사용자명/저장소명.git
   git branch -M main
   git push -u origin main
   ```

## 배포 설정

### 1. baseURL 설정

`hugo.toml` 파일에서 baseURL을 GitHub Pages 주소로 변경하세요:

```toml
baseURL = 'https://사용자명.github.io/저장소명/'
```

예시:
- 저장소 이름이 `my-hugo-site`라면: `baseURL = 'https://사용자명.github.io/my-hugo-site/'`
- 사용자 페이지라면 (저장소 이름이 `사용자명.github.io`): `baseURL = 'https://사용자명.github.io/'`

### 2. GitHub Pages 설정

1. GitHub 저장소 페이지로 이동
2. **Settings** → **Pages** 메뉴 클릭
3. **Source**에서 **GitHub Actions** 선택
4. 저장

### 3. 자동 배포

이제 코드를 푸시하면 자동으로 배포됩니다:

```bash
git add .
git commit -m "Update site"
git push
```

GitHub Actions 탭에서 빌드 진행 상황을 확인할 수 있습니다.

## 배포 확인

배포가 완료되면 (보통 1-2분 소요):
- `https://사용자명.github.io/저장소명/` 에서 사이트 확인
- 또는 저장소의 **Settings** → **Pages**에서 URL 확인

## 문제 해결

### 배포가 안 될 때

1. **GitHub Actions 확인**
   - 저장소의 **Actions** 탭에서 오류 확인
   - 빌드 로그 확인

2. **baseURL 확인**
   - `hugo.toml`의 baseURL이 올바른지 확인
   - 슬래시(/)로 끝나야 함

3. **브랜치 이름 확인**
   - `.github/workflows/hugo.yml`의 `branches`가 올바른지 확인
   - 기본값은 `main`, 오래된 저장소는 `master`일 수 있음

### 로컬에서 테스트

배포 전에 로컬에서 테스트하려면:

```bash
hugo server
```

baseURL을 GitHub Pages 주소로 변경하고 테스트하려면:

```bash
hugo server --baseURL "https://사용자명.github.io/저장소명/"
```

## 커스텀 도메인 사용

커스텀 도메인을 사용하려면:

1. `hugo.toml`의 baseURL을 커스텀 도메인으로 변경
2. GitHub 저장소의 **Settings** → **Pages**에서 커스텀 도메인 설정
3. DNS 설정 (도메인 제공업체에서)

## 참고사항

- 빌드된 파일은 `public/` 폴더에 생성되지만, GitHub Actions가 자동으로 처리하므로 커밋할 필요 없음
- `.gitignore`에 `public/`이 포함되어 있어야 함
- 변경사항을 푸시하면 자동으로 재배포됨

