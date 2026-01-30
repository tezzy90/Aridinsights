# Auto-extracted Prompt 52

## Metadata
- **ID**: 052_intel_analyst_py_72b8c03a.md
- **Category**: misc
- **Source**: ./recovered/engine/intel_analyst.py:26
- **Created**: 2026-01-29T19:19:47.956505

## Prompt Snippet
```text
26-                max_output_tokens=4096
27-            )
28-
29-        except Exception as e:
30-            logger.error(f"Failed to initialize Vertex AI: {e}")
31-            self.model = None
32-
33-    @staticmethod
34-    def _sanitize_input(text: str, max_length: int = 500) -> str:
35-        """
36-        Sanitizes user-provided input to prevent prompt injection.
37-        - Truncates to max_length
38:        - Strips dangerous characters that could break JSON or inject instructions
39-        """
40-        if not text:
41-            return ""
42-
43-        # Truncate to prevent token overflow and limit attack surface
44-        text = text[:max_length]
45-
46-        # Strip characters that could be used for prompt injection
47-        dangerous_chars = ['{', '}', '`', '\\', '"']
48-        for char in dangerous_chars:
49-            text = text.replace(char, '')
50-

```
