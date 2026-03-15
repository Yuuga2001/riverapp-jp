export function Description() {
  return (
    <>
      <h3>Git Branch Name Generatorについて</h3>
      <p>Git Branch Name Generatorは、タスクの説明文からAIが最適なGitブランチ名を自動生成する開発者向けツールです。日本語のタスク説明を入力するだけで、意味のある英語ブランチ名を5つ提案。チーム開発での命名規則の統一にも役立ちます。</p>

      <h3>主な機能</h3>
      <ul>
        <li>AIがタスク説明から5つのブランチ名候補を提案</li>
        <li>日本語の説明を意味のある英語ブランチ名に自動変換</li>
        <li>プレフィックス選択（feature / bugfix / hotfix / fix / カスタム）</li>
        <li>命名規則の設定（kebab-case / snake_case / camelCase / PascalCase）</li>
        <li>チケット番号の自動挿入（Jira / GitHub Issue対応）</li>
        <li>ワンクリックでクリップボードにコピー</li>
      </ul>

      <h3>使い方</h3>
      <ol>
        <li>タスクの説明を入力する（日本語・英語どちらでもOK）</li>
        <li>必要に応じてプレフィックス・命名規則・チケット番号を設定</li>
        <li>Generateボタン（または Cmd + Enter）で生成</li>
        <li>5つの候補から最適なブランチ名をコピー</li>
      </ol>

      <h3>カスタマイズ例</h3>
      <p>入力例：「カート機能の修正」→ 生成結果：<code>feature/fix-cart-functionality</code>、<code>bugfix/resolve-cart-issue</code> など。プレフィックスやケーススタイル、チケット番号の有無を自由に組み合わせて、チームのルールに合ったブランチ名を生成できます。</p>
    </>
  );
}
