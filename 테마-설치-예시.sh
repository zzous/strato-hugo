#!/bin/bash
# Hugo 테마 설치 예시 스크립트

echo "Hugo 테마를 설치합니다..."
echo ""

# themes 디렉토리 생성
mkdir -p themes

echo "어떤 테마를 설치하시겠습니까?"
echo "1. PaperMod (깔끔한 블로그 테마)"
echo "2. Stack (카드 스타일 테마)"
echo "3. Ananke (간단한 테마)"
echo "4. 취소"
read -p "선택 (1-4): " choice

case $choice in
    1)
        echo "PaperMod 테마를 설치합니다..."
        git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
        echo "설치 완료! hugo.toml에 theme = \"PaperMod\" 을 추가하세요."
        ;;
    2)
        echo "Stack 테마를 설치합니다..."
        git submodule add https://github.com/CaiJimmy/hugo-theme-stack.git themes/stack
        echo "설치 완료! hugo.toml에 theme = \"stack\" 을 추가하세요."
        ;;
    3)
        echo "Ananke 테마를 설치합니다..."
        git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke
        echo "설치 완료! hugo.toml에 theme = \"ananke\" 을 추가하세요."
        ;;
    4)
        echo "취소되었습니다."
        ;;
    *)
        echo "잘못된 선택입니다."
        ;;
esac

