---
title: "Hugo 시작하기"
date: 2024-11-10
draft: false
categories: ["가이드"]
tags: ["Hugo", "시작하기", "튜토리얼"]
---

# Hugo 시작하기 가이드

Hugo로 정적 사이트를 만드는 방법을 단계별로 안내합니다.

## 1단계: 설치

Hugo를 설치하는 방법은 여러 가지가 있습니다:

- Windows: `winget install Hugo.Hugo.Extended`
- macOS: `brew install hugo`
- Linux: 패키지 매니저 사용

## 2단계: 새 사이트 생성

```bash
hugo new site my-site
cd my-site
```

## 3단계: 콘텐츠 추가

```bash
hugo new posts/my-first-post.md
```

## 4단계: 서버 실행

```bash
hugo server
```

브라우저에서 `http://localhost:1313`으로 접속하세요!

## 다음 단계

이제 테마를 추가하고 콘텐츠를 작성해보세요.

