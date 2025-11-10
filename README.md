# Hugo 프로젝트

이것은 Hugo 정적 사이트 생성기로 만든 프로젝트입니다.

## 시작하기

1. Hugo가 설치되어 있는지 확인:
   ```bash
   hugo version
   ```

2. 개발 서버 실행:
   ```bash
   hugo server
   ```

3. 브라우저에서 `http://localhost:1313` 접속

## 프로젝트 구조

- `content/` - 콘텐츠 파일 (마크다운)
- `layouts/` - HTML 템플릿
- `static/` - 정적 파일 (CSS, 이미지 등)
- `archetypes/` - 새 콘텐츠 생성 시 사용할 템플릿
- `hugo.toml` - Hugo 설정 파일

## 새 페이지 생성

```bash
hugo new posts/my-first-post.md
```

## GitHub Pages 배포

이 프로젝트는 GitHub Pages에 자동 배포되도록 설정되어 있습니다.

자세한 배포 방법은 [GitHub-Pages-배포-가이드.md](GitHub-Pages-배포-가이드.md)를 참고하세요.

### 빠른 시작

1. GitHub에 저장소 생성 및 코드 푸시
2. `hugo.toml`의 `baseURL`을 GitHub Pages 주소로 변경
3. GitHub 저장소의 **Settings** → **Pages**에서 **GitHub Actions** 선택
4. 코드 푸시 시 자동 배포됨

