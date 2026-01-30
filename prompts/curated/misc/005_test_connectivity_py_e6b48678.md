# Auto-extracted Prompt 5

## Metadata
- **ID**: 005_test_connectivity_py_e6b48678.md
- **Category**: misc
- **Source**: ./tools/test_connectivity.py:34
- **Created**: 2026-01-29T19:19:47.948347

## Prompt Snippet
```text
34-    except Exception as e:
35-        print(f"❌ Earth Engine Failed: {e}")
36-        print("   (Did you run 'earthengine authenticate'?)")
37-        return False
38-
39-if __name__ == "__main__":
40-    print("--- Arid Analysis Connectivity Test ---\n")
41-    bq_ok = test_bigquery()
42-    log_ok = test_logging()
43-    ee_ok = test_ee()
44-    
45-    if bq_ok and log_ok and ee_ok:
46:        print("\n🎉 ALL SYSTEMS GO! The Analysis Server is ready to run.")
47-        sys.exit(0)
48-    else:
49-        print("\n⚠️ Some checks failed. Please authenticate using 'gcloud auth application-default login' and 'earthengine authenticate'.")
50-        sys.exit(1)

```
